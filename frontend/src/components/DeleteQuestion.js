import React from 'react';
import { useState } from 'react';
 
const DeleteQuestion = () => {
    const [id,setID]=useState("");
 
    const [isSubmitted, setIsSubmitted] = useState(false); // State to track if form is submitted successfully
    const onSubmit = async (e) => {
        e.preventDefault();

      
     
      
        const url = `http://127.0.0.1:5000/delete_question/${id}`; //Fetching Deleting Request
        

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            
        }
        const response = await fetch(url, options)
        console.log(response);
        setIsSubmitted(true);
        if (response.status===404 || response.status!==200) {
            const data = await response.json()
            alert(data.message)
            setIsSubmitted(false);
        }
    };
    const renderSuccessMessage = () =>(
        <div>
             <p>Question successfully deleted!</p>
        </div>
    )
  return (
    <div className="deleteQuestions">
      <h2>Delete Question</h2>
     {!isSubmitted? (<form onSubmit={onSubmit}>
      
            <div>
                <label htmlFor="ID">Give the Question ID you want to delete:</label>
                <input
                    type="text"
                    id="ID"
                    value={id}
                    onChange={(e) => setID(e.target.value)}
                required/>
            </div>
            <button type="submit">Delete Question</button>
        </form>):(renderSuccessMessage())
}
    </div>
  );
};

export default DeleteQuestion;
