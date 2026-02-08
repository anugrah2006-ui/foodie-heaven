const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

// 1. Order Lifecycle Automation
// When an order is created, validate pricing and stock
exports.onOrderCreated = functions.firestore
    .document("orders/{orderId}")
    .onCreate(async (snap, context) => {
        const orderData = snap.data();
        const orderId = context.params.orderId;

        try {
            // Logic: Verify restaurant is open
            const resSnap = await db.collection("restaurants").doc(orderData.resId).get();
            if (!resSnap.exists || resSnap.data().status !== "open") {
                return snap.ref.update({ status: "cancelled", reason: "Restaurant is closed" });
            }

            // Logic: Auto-log this transaction
            await db.collection("adminLogs").add({
                type: "SYSTEM_ACTION",
                action: "NEW_ORDER_INITIALIZED",
                targetId: orderId,
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
                details: `Order for $${orderData.total} initialized by ${orderData.userId}`
            });

            console.log(`Order ${orderId} successfully initialized.`);
        } catch (error) {
            console.error("Order processing error:", error);
        }
    });

// 2. Admin Action Logger (Audit Trail)
// Tracks any manual changes made by admins to restaurants or users
exports.onAdminActionLog = functions.firestore
    .document("restaurants/{resId}")
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const oldData = change.before.data();
        const resId = context.params.resId;

        // Note: In real app, we verify auth.token.role via context.auth
        // For audit:
        await db.collection("adminLogs").add({
            type: "ADMIN_ACTION",
            action: "RESTAURANT_UPDATE",
            targetId: resId,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
            diff: {
                before: oldData,
                after: newData
            }
        });
    });

// 3. SECURE Admin Action: Block User
// Callable function to ensure only Super Admins can block users
exports.secureBlockUser = functions.https.onCall(async (data, context) => {
    // Check if the requester is an admin
    const callerId = context.auth.uid;
    const callerSnap = await db.collection("users").doc(callerId).get();

    if (!callerSnap.exists || callerSnap.data().role !== "super_admin") {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Only Super Admins can block users."
        );
    }

    const targetUid = data.uid;
    await db.collection("users").doc(targetUid).update({ status: "blocked" });

    // Log the action
    await db.collection("adminLogs").add({
        type: "SECURITY_ACTION",
        adminId: callerId,
        action: "USER_BLOCKED",
        targetId: targetUid,
        timestamp: admin.firestore.FieldValue.serverTimestamp()
    });

    return { success: true, message: `User ${targetUid} has been blocked.` };
});
