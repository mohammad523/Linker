/** @format */

import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import "./Posts.css";

const PostItem = ({
	addLike,
	removeLike,
	deletePost,
	auth,
	post: { _id, text, name, avatar, user, likes, comments, date },
}) => (
	<div className='post bg-white p-1 my-1'>
		<div>
			<Link to={`/profile/${user}`}>
				<img className='round-img' src={avatar} alt='' />
				<h4>{name}</h4>
			</Link>
		</div>
		<div>
			<p className='my-1'>{text}</p>
			<p className='post-date'>Posted on {formatDate(date)}</p>

			<button
				onClick={() => addLike(_id)}
				type='button'
				className='btn-small btn-light'
			>
				Like
				<i className='fas fa-thumbs-up' />{" "}
				<span>{likes.length > 0 && <span>{likes.length}</span>}</span>
			</button>
			<button
				onClick={() => removeLike(_id)}
				type='button'
				className='btn-small btn-light'
			>
				Dislike
				<i className='fas fa-thumbs-down' />
			</button>
			<Link to={`/posts/${_id}`} className='btn-small btn-primary'>
				<button className='btn-small'>Comments</button>

				{comments.length > 0 && (
					<span className='comment-count'>{comments.length}</span>
				)}
			</Link>
			{!auth.loading && user === auth.user._id && (
				<button
					onClick={() => deletePost(_id)}
					type='button'
					className='btn-small btn-danger'
				>
					<i className='fas fa-times' />
					Delete
				</button>
			)}
		</div>
	</div>
);

PostItem.propTypes = {
	post: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
	PostItem
);
