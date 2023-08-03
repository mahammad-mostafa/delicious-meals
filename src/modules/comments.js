export default class Comments{
  constructor(network, itemId, username, comment) {
    this.network = network;
    this.itemId = itemId;
    this.username = username;
    this.comment = comment;
  }

  postCommentMethod = () => {
    this.network.postComment(this);
  }
}  