import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import baseUrl from '../../utils/baseUrl';
import axios from 'axios';
import { parseCookies } from 'nookies';
import Link from 'next/link';
import { SuccessToaster } from '../../components/layout/Toastr';
import { deleteMovie, updateMovie } from '../../utils/movieActions';
import { genreMovies } from '../../utils/genreMovies';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';



const MovieName = ({ movie, user: { role } }) => {
    const router = useRouter();
    const { id } = router.query;
    const [movieData, setmovieData] = useState({
        title: movie.title || '',
        description: movie.description || '',
        duration: movie.duration || '',
        imgLgPoster: movie.imgLgPoster || '',
        imgSmPoster: movie.imgSmPoster || '',
        video: movie.video || '',
        genre: movie.genre || '',
        trailer: movie.trailer || '',
        year: movie.year || ''
    })
    const [showToaster, setShowToaster] = useState(false);
    const { title, description, year, duration, imgSmPoster, genre, imgLgPoster, video, trailer} = movieData;
    const handleChange = e => {
        const { name, value } = e.target;
        setmovieData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await updateMovie(movieData, id, setShowToaster, router);
    }
    return (
        <>
            {showToaster && <SuccessToaster successMsg="Updated Successfully!" />}
            <form className='staffForm' onSubmit={handleSubmit}>
                <div className='left'>
                    <img src={movie.imgSmPoster} alt={movie.title} />
                </div>
                <div className='right'>
                    <div className='formChild'>
                        <h3>Id:</h3>
                        <input value={movie._id} disabled />
                    </div>
                    <div className='formChild'>
                        <h3>Title:</h3>
                        <input
                            value={title ? title : movie.title}
                            name='title'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Description:</h3>
                        <input
                            value={description ? description : movie.description}
                            name='description'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Year:</h3>
                        <input
                            value={year ? year : movie.year}
                            name='year'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Duration:</h3>
                        <input
                            value={duration ? duration : movie.duration}
                            name='duration'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Img Poster:</h3>
                        <input
                            value={imgLgPoster ? imgLgPoster : movie.imgLgPoster}
                            name='imgLgPoster'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Small Poster:</h3>
                        <input
                            value={imgSmPoster ? imgSmPoster : movie.imgSmPoster}
                            name='imgSmPoster'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Trailer:</h3>
                        <input
                            value={trailer ? trailer : movie.trailer}
                            name='trailer'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Video:</h3>
                        <input
                            value={video ? video : movie.video}
                            name='video'
                            onChange={handleChange} />
                    </div>
                    <div className='formChild'>
                        <h3>Genre:</h3>
                        <select name="genre" onChange={handleChange}>
                            <option selected>{movie.genre}</option>
                            {genreMovies.map((genre) => (
                                <option>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className='buttonSection'>
                        <button className='update'>
                            Update Movie
                        </button>
                        <Link href={'/movies'}>
                            <button className='cancel'>
                                Cancel
                            </button>
                        </Link>
                    </div>
                </div>
            </form>
        </>
    )
}


MovieName.getInitialProps = async (ctx) => {
    const { token } = parseCookies(ctx);
    try {
        const res = await axios.get(`${baseUrl}/movie/${ctx.query.id}`, { headers: { Authorization: token } });
        const { movie } = res.data;
        return { movie }
    } catch (error) {
        return { errorLoading: true }
    }
}
export default MovieName