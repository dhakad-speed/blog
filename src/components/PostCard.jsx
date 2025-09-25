import React from "react";
import service from "../appwrite/service";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      {" "}
      <div className="bg-black/5 hover:bg-[#f4f4f7] rounded-lg p-3 w-full text-[#56565c] ">
        <div className="w-full justify-center mb-4">
          <img
            src={service.getFilePreview(featuredImage)}
            alt={title}
            className="object-contain h-auto"
          />
        </div>
        <h2 className="text-sm font-medium">{title}</h2>
      </div>
    </Link>
  );
}

export default PostCard;
