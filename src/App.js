import { useState } from "react";

function App() {
    const [toDo, setToDo] = useState();
    const onChange = (e) => setToDo(e.target.value);
    console.log(toDo);
    return (
        <div>
            <input
                onChange={onChange}
                value={toDo}
                type="text"
                placeholder="Write your to do..."
            />
        </div>
    );
}

export default App;
