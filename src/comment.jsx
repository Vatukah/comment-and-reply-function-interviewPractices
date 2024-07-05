import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Compo from "./component";
const color = [
  "#FFB6C1", // Light Pink
  "#ADD8E6", // Light Blue
  "#90EE90", // Light Green
  "#FFFACD", // Lemon Chiffon
  "#FFDEAD", // Navajo White
  "#D8BFD8", // Thistle
  "#E0FFFF", // Light Cyan
  "#F5DEB3", // Wheat
  "#FFE4B5", // Moccasin
  "#FFDAB9", // Peach Puff
];

export default function CommentSec() {
  const [commentSec, setCommentSec] = useState(true);
  const [replyToId, setReplyToId] = useState(null);
  const [text, setText] = useState("");
  const setc = color[Math.floor(Math.random() * (color.length - 1))];
  const [comment, setComment] = useState([
    {
      id: "Anupam Thakur",
      user: "Anupam Thakur",
      userDp: setc,
      comment: "Nice to meet you",
      replys: [],
    },
  ]);

  function addComment() {
    const uId = uuidv4();
    const newComment = {
      id: uId,
      user: uId.split("-")[0],
      userDp: setc,
      comment: text,
      replys: [],
    };
    setComment([...comment, newComment]);
    setText("");
  }

  // add replies to specified comment id
  const addreply = (replyTo, reply) => {
    const newReply = {
      user: setc,
      text: reply,
    };
    const fetchComment = comment.find((comment) => comment.id === replyTo);
    console.log(fetchComment);
    const updatedReply = [...fetchComment?.replys, newReply];

    setComment((prev) =>
      prev.map((comment) =>
        comment.id === replyTo ? { ...comment, replys: updatedReply } : comment
      )
    );
    setCommentSec(!commentSec);
    setText("");
    setReplyToId(null);
  };

  // function get the id of comment on which you want to reply
  const idGetter = (e) => {
    const parent = e.target.parentNode;
    const pId = parent.getAttribute("data-id");

    setReplyToId(pId); //updates state with commentId
    setCommentSec(false);
  };

  const commentEle = comment.map((items) => (
    <Compo key={items.id} data={items} handler={idGetter} />
  ));

  useEffect(() => {}, [comment]);
  return (
    <>
      <div className="comments">{commentEle}</div>
      <div className="addComment">
        <div>
          <textarea
            name="commentInput"
            id="commentInput"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={200}
            placeholder="write your comment"
            className={`${replyToId ? "paddingTop" : ""}`}
          />
          {replyToId ? (
            <div className="replyId">
              reply to <span>{replyToId.split("-")[0]}</span>
            </div>
          ) : (
            ""
          )}
        </div>

        {commentSec ? (
          <button className="btn" onClick={addComment}>
            Add Comment
          </button>
        ) : (
          <button
            className="btn"
            onClick={() => {
              addreply(replyToId, text);
            }}
          >
            Add Reply
          </button>
        )}
      </div>
    </>
  );
}
