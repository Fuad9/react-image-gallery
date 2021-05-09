import React, { useState } from "react";
import { makeStyles, Modal } from "@material-ui/core";
//styles
import postStyles from "./Posts.module.scss";
import CloseIcon from "@material-ui/icons/Close";

const Posts = ({ data }) => {
   function rand() {
      return Math.round(Math.random() * 20) - 10;
   }

   function getModalStyle() {
      const top = 50 + rand();
      const left = 50 + rand();

      return {
         top: `${top}%`,
         left: `${left}%`,
         transform: `translate(-${top}%, -${left}%)`,
      };
   }

   const useStyles = makeStyles((theme) => ({
      paper: {
         position: "absolute",
         width: 560,
         height: 560,
         padding: theme.spacing(2, 4, 3),
         background: "#fff",
      },
      image: {
         widht: "100%",
         height: "12rem",
      },
      footer: {
         border: "none",
         background: "transparent",
      },
      avatar: {
         width: "2.5rem",
         borderRadius: "50%",
         marginRight: "0.8rem",
      },
      closeIcon: {
         cursor: "pointer",
         marginLeft: "auto",
      },
   }));

   const classes = useStyles();
   const [modalStyle] = useState(getModalStyle);
   const [open, setOpen] = useState(false);
   const [modalData, setModalData] = useState({});

   const handleOpen = (dt) => {
      setModalData(dt);
      setOpen(true);
   };

   const handleClose = () => {
      setOpen(false);
   };

   const { title, content, thumbnail, author } = modalData;

   const modalBody = (
      <div style={modalStyle} className={`card ${classes.paper}`}>
         <CloseIcon className={classes.closeIcon} onClick={handleClose} />
         <img className={classes.image} src={thumbnail?.small} alt="" />
         <div className="card-body">
            <h3 className="card-title">{title}</h3>
            <p className="card-text">{content}</p>
         </div>
         <div className={`card-footer ${classes.footer}`}>
            <small>
               <img className={classes.avatar} src={author?.avatar} alt="" />
               {author?.name} - {author?.role}
            </small>
         </div>
      </div>
   );

   return (
      <div
         className={`row row-cols-2 row-cols-md-2 g-4 ${postStyles.postsContainer}`}
      >
         {data.map((dt) => (
            <div className={`col-12 ${postStyles.posts}`} key={dt.id}>
               <div className="card">
                  <img
                     src={dt.thumbnail.small}
                     className="card-img-top"
                     alt="..."
                  />
                  <div className={postStyles.overlay}>
                     <div
                        className={postStyles.text}
                        onClick={() => handleOpen(dt)}
                     >
                        Learn More
                     </div>
                  </div>
                  <Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="simple-modal-title"
                     aria-describedby="simple-modal-description"
                  >
                     {modalBody}
                  </Modal>
                  <div className="card-body">
                     <h3 className="card-title">{dt.title}</h3>
                     <p className="card-text">{dt.content}</p>
                  </div>
                  <div className={`card-footer ${postStyles.cardFooter}`}>
                     <small>
                        {dt.author.name} - {dt.author.role}
                     </small>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
};

export default Posts;
