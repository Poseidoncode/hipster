const express = require("express");
const db = require(__dirname + "/db_connect2");
const upload = require(__dirname + "/upload-module");
const router = express.Router();

//訂單列表
router.get("/comments/:memberId", async (req, res) => {
  const data = {
    comment: [],
    notcomment: [],
  };

  const sqlcommentlist =
    "SELECT `comments`.`commentId`, `comments`.`itemListId`,`comments`.`content`, `comments`.`star`, `comments`.`created_at`, `comments`.`updated_at`,`item_lists`.`productId`,`item_lists`.`orderId`,`item_lists`.`date`,`product`.`productName`, `item_lists`.`memberId` FROM `comments`LEFT JOIN `item_lists` ON `comments`.`itemListId` =`item_lists`.`itemListId` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId` LEFT JOIN `orderlist` ON `item_lists`.`orderId` =`orderlist`.`orderId` WHERE `item_lists`.`memberId` = ?";

  const sqlnotcommentlist = "SELECT `item_lists`.`itemListId`, `item_lists`.`orderId`, `item_lists`.`memberId`, `item_lists`.`productId`, `item_lists`.`date`, `item_lists`.`checkPrice`, `item_lists`.`checkQty`, `item_lists`.`checkSubtotal`, `item_lists`.`created_at`, `item_lists`.`updated_at`,`product`.`productName` FROM `item_lists` LEFT JOIN `product`ON `item_lists`.`productId` =`product`.`productId`  WHERE `item_lists`.`memberId` = ?";

 

  const [r1] = await db.query(sqlcommentlist, [req.params.memberId]);
  const [r2] = await db.query(sqlnotcommentlist, [req.params.memberId]);

  data.comment = r1;
  data.notcomment = r2;

  res.json(data);
});

//訂單新增
router.post("/sendComments/:memberId", async (req, res) => {

  const addCommentList =
    "INSERT INTO `comments` (`itemListId`,`content`, `star`) VALUES (?,?,?)";


  //新增評論到資料庫
  const [r2] = await db.query(addCommentList, [
    req.body.itemListId,
    req.body.content,
    req.body.star,
  ]);
  
  console.log("訂單新增成功" + orderId);

})

module.exports = router;