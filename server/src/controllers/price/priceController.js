import PriceModel from "../../models/price/priceModel.js";
import { isValidId } from "../../utils/index.js";

/* -------------------------------------------------------------------------- */
/*                                get one Data                               */
/* -------------------------------------------------------------------------- */

  export const getOneData = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!isValidId(id))
        return res
          .status(404)
          .send({ message: `No data found with id: ${id}` });
  
      const price = await PriceModel.findById(id);
      if (!price)
        return res.status(404).json({ message: "data doesn't exist" });  
  
      res.status(200).json({
        message: 'successfully',
        price,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
      console.log(error);
    }
  };


/* -------------------------------------------------------------------------- */
/*                                 update price                               */
/* -------------------------------------------------------------------------- */

  export const updatePrice = async (req, res) => {
    const { id } = req.params;
  
    try {
      if (!isValidId(id))
        return res
          .status(404)
          .send({ message: `No data found with id: ${id}` });
  
      const price = await PriceModel.findById(id);
      if (!price)
        return res.status(404).json({ message: "data doesn't exist" });  
  
      const result = await PriceModel.findByIdAndUpdate(
        id,
        {
          _id: id,
          ...req.body,
        },
        { new: true }
      );
      res.status(200).json({
        message: `Update successfully`,
        result,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };