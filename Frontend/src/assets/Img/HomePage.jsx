import React, { useState, useEffect } from "react";
import "./HomePage.css";
import MemeContainer from "./MemeContainer";
import { useFormik } from "formik";
import * as Yup from "yup";
import Loader from "react-loader-spinner";


function HomePage() {

  const [loading, setLoading] = useState(false);

  // DATA VALIDATION USING FORMIK AND YUP
  const { handleSubmit,handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      caption: "",
      url: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name Required").min(1),
      caption: Yup.string().required("Caption Required").min(1),
      url: Yup.string().required("Url Required").min(3),
    }),
    onSubmit: (values,{resetForm}) => {
      resetForm({values: ""})
      // console.log(values);
      uploadMeme(values);
      
    },
  });

  // const [name, setName] = useState("");
  // const [caption, setCaption] = useState("");
  // const [url, setUrl] = useState("");

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts();
  }, []);

  // fetch all posts from the database
  const fetchPosts = () => {
    setLoading(true)
    const URL2 = process.env.REACT_APP_URL + "/memes";
    fetch(URL2)
      .then((resp) => resp.json())
      .then((response) => {
        // console.log(response);
        setPosts(response);
        setLoading(false);
      })
      .catch((err)=> {
        setLoading(false);
        alert("Could not fetch memes. Contact server!")
      });
  };

  // upload a meme post
  const uploadMeme = ({name,caption,url}) => {
    setLoading(true);
    const URL1 = process.env.REACT_APP_URL + "/memes";
    const bodyObj = {
      name: name,
      caption: caption,
      url: url,
    };

    fetch(URL1, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(bodyObj),
    })
      .then((response) => {
        setLoading(false);
        // console.log(response);
        if(response.status == "409")
        alert("FAILED TO UPLOAD!\nThis post already exists!!")
        else
        alert("Post Uploaded successfully");
        window.location.reload();
        // fetchPosts(); // refresh container with updated post
      })
      .catch((err) => {
        setLoading(false);
        console.error(err);
      });
  };
  return (
    <div>
      {/* HEADER */}
      <div className="header">
        <h1>XMEME</h1>
      </div>
      {/* FORM CONTAINER */}
      <form onSubmit={handleSubmit}>
      <div className="form-container">
        <label>
          <b>Meme Creator</b>
        </label>
        <input
          type="text"
          placeholder="Enter your name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && touched.name && <p>{errors.name}</p>}

        <label>
          <b>Caption</b>
        </label>
        <input
          type="text"
          placeholder="Enter the caption for meme"
          name="caption"
          value={values.caption}
          onChange={handleChange}
        />
        {errors.caption && touched.caption && <p>{errors.caption}</p>}

        <label>
          <b>Meme URL</b>
        </label>
        <input
          type="text"
          placeholder="Enter the URL of your meme here"
          name="url"
          value={values.url}
          onChange={handleChange}
        />
        {errors.url && touched.url && <small style={{color:"red"}}>&#9888;{errors.url}</small>}

        <button type="submit" className="submit_button">
          Submit Meme
        </button>
      </div>
      </form>
      {/* MEME CONTAINER */}

      <div className="posts-container">
        {loading ?
        (<div style={{textAlign:"center",margin:"10px auto"}}> 
        <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
        </div>)
        :
        posts.length > 0 ? (
          posts.map((post, index) => {
            return <MemeContainer key={index} post={post} />;
          })
        ) : (
          <div style={{ textAlign: "center" }}>NO MEMES HERE😴😴</div>
        )}
        <div
          style={{
            textAlign: "center",
            margin: "1rem auto",
            paddingBottom: "20px",
          }}
        >
          Total posts : {posts.length}
        </div>
      </div>
      {/* FOOTER */}
      <div
        className="footer"
        style={{ textAlign: "center", background: "#2f2f2f" }}
      >
        Created by <br />
        Pritam Kar
      </div>
    </div>
  );
}

export default HomePage;
