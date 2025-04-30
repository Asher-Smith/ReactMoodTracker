import React, { useState } from 'react';
import './App.css'

//TODO: change CSS so that form doesnt move when you add new days

function MoodTracker() {

    const [days, setDays] = useState(() => {
        const storedDays = localStorage.getItem("days");
        return storedDays ? JSON.parse(storedDays) : [];
    });
    const [mood, setMood] = useState(2);
    const [notes, setNotes] = useState("");


    function saveDay() {
        const today = new Date();

        const newDays = {
            date: `${String(today.getFullYear())}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`,
            mood: mood,
            notes: notes
        };

        const updatedDays = [...days, newDays];

        setDays(updatedDays);

        localStorage.setItem("days", JSON.stringify(updatedDays));

        setMood(2);
        setNotes("");
    }

    function deleteTask(index) {
        const filteredDays = days.filter((element, i) => i !== index);


        setDays(filteredDays);
        localStorage.setItem("days", JSON.stringify(filteredDays));
    }

  return (
      <div className="container">
        <div className="mood-form">
          <h1>Mood Tracker</h1>

          <div>
              <div>
                  <div>
                      <h3>Todays Mood:</h3>
                      <form>
                          <input type="radio" checked={mood === 1} onChange={(e) => setMood(parseInt(e.target.value))} name="mood" id="sad" value="1" />
                          <label className="mood-button" for="sad">&#128543;</label>
                          <input type="radio" checked={mood === 2} onChange={(e) => setMood(parseInt(e.target.value))} name="mood" id="meh" value="2" />
                          <label className="mood-button" for="meh">&#128529;</label>
                          <input type="radio" checked={mood === 3} onChange={(e) => setMood(parseInt(e.target.value))} name="mood" id="happy" value="3" />
                          <label className="mood-button" for="happy">&#128512;</label>
                      </form>
                  </div>
                  <div>
                      <h3>Today's notes:</h3>
                      <textarea onChange={(e) => setNotes(e.target.value)} value={ notes } placeholder="Type notes for the day here..." />
                  </div>
                  <br/>
                  <div>
                      <button onClick={() => saveDay()}>Save Day</button>
                  </div>
              </div>
          </div>

          <br />
              <hr />
          </div>
          <div>
              <h2>Past days:</h2>
              <div>
                  <ol>
                      {days.map((day, index) =>
                          <div>
                          <li className="day-item">
                                  <div className="day-label" >Date:</div>
                                  <div className="day-values">{day.date}</div>
                                  <div className="day-label" >Mood:</div>
                                  <div className="day-values">{day.mood === 1 ? String.fromCodePoint(0x1F641) : day.mood === 2 ? String.fromCodePoint(0x1F610) : String.fromCodePoint(0x1F600)}</div>
                                  <div className="day-label"><button className="remove-button" onClick={ () => deleteTask(index) } >Remove</button></div>
                              <div><div className="day-label" >Notes:</div>{day.notes}</div>
                          </li>
                          <hr />
                          </div>
                      )}
              </ol>
              </div>
          </div>
    </div>
  );
}

export default MoodTracker;