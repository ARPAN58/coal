import axios from "axios";

export default async function handler(req, res) {
  const { quantity } = req.body;

  try {
    const response = await axios.post(
      "https://dbc-20f214f0-260f.cloud.databricks.com/serving-endpoints/coal-profit-endpoint/invocations",
      {
        dataframe_records: [
          {
            Quantity_Tons: Number(quantity)
          }
        ]
      },
      {
        headers: {
          Authorization: `Bearer 9d7d8a34a01bea460b932f4eb3d023c8300638166f06ad850b2337eb6f9ae46a`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
