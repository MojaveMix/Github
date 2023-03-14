import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Comments() {

    const history = useNavigate();
    const { id } = useParams();

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const rndInt = randomIntFromInterval(1, 4);


    const [inputData, setInputData] = useState({
        Text: '',
        RefArticle: parseInt(id),
        userid: rndInt
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/Comments/", inputData).then(res => {
            alert("Your Comment posted successfully")
            history("/")
        }
        )
    }

    return (
     <div className="container">
        <div className='container mt-1 col-6'>
            <div>
                <form onSubmit={handleSubmit}  >
                    <br />
                    <br />

                    <div   style={{ position : "relative" , left : "100px"  }}>
                        <h4 style={{
                        }}
                        >Add comments:</h4>
                        <textarea name="commentaire" className='form-control '
                            onChange={e => setInputData({ ...inputData, Text: e.target.value })}
                            id="comments" cols="30" rows="5"
                        >
                        </textarea>
                        </div>
                            <div>
                        <button className='btn btn-primary col-3 mt-3'   style={{ position : "relative" , left : "100px"   }} >Add</button>
                    </div>
                    <br />
                </form>
            </div>
        </div>
     </div>

    )
}
