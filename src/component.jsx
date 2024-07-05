export default function Compo({ data, handler }) {
  const replies = data.replys.map((reply) => (
    <div>
      <div className="ruser" style={{ backgroundColor: reply.user }}></div>
      <div>{reply.text}</div>
    </div>
  ));
  return (
    <div className="comment" data-id={data.id}>
      <div>
        <div
          className="user"
          style={{
            backgroundColor: data.userDp,
          }}
        ></div>
        <div>{data.user}</div>
      </div>
      <div className="text">{data.comment}</div>
      <button
        style={{
          color: "skyBlue",
        }}
        onClick={(e) => handler(e)}
      >
        reply
      </button>
      {data.replys.length > 0 ? <div className="replies">{replies}</div> : ""}
    </div>
  );
}
