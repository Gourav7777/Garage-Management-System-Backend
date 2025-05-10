const razorpay = require("../utils/razorpay");

exports.createOrder = async (req, res) => {
  try {
    const { amount, currency = "INR" } = req.body;
    const options = {
      amount: amount * 100, // convert to paise
      currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 1000000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
