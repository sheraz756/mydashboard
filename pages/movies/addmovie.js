import Link from 'next/link'
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCarRear, faPlugCircleBolt } from "@fortawesome/free-solid-svg-icons";
import { parseCookies } from 'nookies';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { createMovie } from '../../utils/movieActions';
import { ErrorToastr, SuccessToaster } from '../../components/layout/Toastr';
import { Loading } from '../../components/common/Loading';
import { useRouter } from 'next/router';
import { genreMovies } from '../../utils/genreMovies';
import catchErrors from '../../utils/catchErrors';


const AddMovie = ({ movieGenre }) => {

  const router = useRouter();
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [subtitle, setSubTitle] = useState(null);
  const [trailer, setTrailer] = useState('');
  const [video, setVideo] = useState('');
  const [video480, setVideo480] = useState('');
  const [video720, setVideo720] = useState('');
  const [title, setTilte] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [genre, setGenre] = useState('');
  const [duration, setDuration] = useState('');
  const [submitDisable, setSubmitDisable] = useState(true);
  const [showToaster, setShowToaster] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(subtitle);

  useEffect(() => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  }, [error])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData;
    formData.append('img', img);
    formData.append('imgTitle', imgTitle);
    formData.append('subtitle', subtitle);
    formData.append('trailer', trailer);
    formData.append('video', video);
    formData.append('video480', video480);
    formData.append('video720', video720);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('year', year);
    formData.append('genre', genre);
    formData.append('duration', duration);
    setFormLoading(true);
    await axios.post(`${baseUrl}/movie`, formData).then((res) => {
      console.log(res.data);
      setShowToaster(true);
      router.reload();
    }).catch((err) => {
      const errorMsg = catchErrors(err);
      setError(errorMsg);
    }).finally(() => setFormLoading(false));

  };
  const checkMovieData = {
    img, imgTitle, title, description, year, genre, duration, trailer, video,video480,video720
  }
  useEffect(() => {
    const isMovie = Object.values({ img, imgTitle, title, description, year, genre, duration, trailer, video  }).every(item => Boolean(item));
    isMovie ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [checkMovieData]);


  return (
    <div className="newProduct">
      <h1 className="addProductTitle">Create New Movie</h1>
      <form className="addProductForm">
        {error && <ErrorToastr error={error} />}
        {showToaster && <SuccessToaster successMsg="Movie Created Successfully!" />}
        <div className='movieUploadSection'>
          <div className="addProductItem">
            <label>Large Poster</label>
            <input
              type="file"
              name="img"
              accept='image/*'
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Small Poster</label>
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              accept='image/*'
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="addProductItem">
            <label>Subtitle file</label>
            <input
              type="file"
              id="imgTitle"
              name="subtitle"
              accept='.vtt,.srt,.txt'
              onChange={(e) => setSubTitle(e.target.files[0])}
            />
          </div>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            type="text"
            placeholder="ex: John Wick"
            name="title"
            autoComplete='off'
            onChange={(e) => setTilte(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>1080 Video Link add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://xyx.com"
            autoComplete='off'
            name="video"
            onChange={(e) => setVideo(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>720 Video Link add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://xyx.com"
            autoComplete='off'
            name="video480"
            onChange={(e) => setVideo480(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>480 Video Link add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://xyx.com"
            autoComplete='off'
            name="video720"
            onChange={(e) => setVideo720(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Trailer add this url before file https://d31l9z8mg60g9s.cloudfront.net/</label>
          <input
            type="text"
            placeholder="https://d31l9z8mg60g9s.cloudfront.net/filename"
            name="trailer"
            autoComplete='off'

            onChange={(e) => setTrailer(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            type="text"
            placeholder="description"
            autoComplete='off'
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input
            type="text"
            placeholder="Year"
            autoComplete='off'
            name="year"
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input
            type="text"
            placeholder="Duration"
            autoComplete='off'
            name="duration"
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <select name="genre" onChange={(e) => setGenre(e.target.value)}>
            <option selected disabled>Select Genre</option>
            {genreMovies.map((genre) => (
              <option>{genre}</option>
            ))}
          </select>
        </div>

      

        <button className="addProductButton" onClick={handleSubmit} disabled={submitDisable}>
          {formLoading ? <Loading h={25} w={25} /> : 'Create/Upload'}
        </button>
      </form>
    </div>
  )
}


export default AddMovie;



