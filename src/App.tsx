import "./App.css";
import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// String.prototype.concat = (...strings: string[]) => {
//   let result = strings[0];
//   if (length(strings) > 1) {
    
//   }
// }

class TaintedString extends String {
  tainted: boolean;
  constructor(value: string) {
    super(value)
    this.tainted = true
  }
  sanitize() {
    return this.toString()
  }
}

type TaintableString = string | TaintedString

function isTainted(str: TaintableString): str is TaintedString {
  return (str as TaintedString).tainted !== undefined;
}

function App() {
  const [name, setName] = useState<TaintableString>("");
  
  function taintSetName(value: string) {
    let s = new TaintedString(value);
    setName(s);
  }

  function clickHandler() {
    if (isTainted(name)) {
      let sanitized = name.sanitize()
      setName(sanitized);
    }
  }

  function evaluator() {
    if (isTainted(name)) {
      alert("String is tainted, and must be sanitized before evaluating!");
    } else {
      alert(eval(String(name)));
    }
  }

  function concatenator() {
    let a = "hello"
    let b = "world"
    let c = a + b;
  }


  return (
    <div className="App">
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={(event) => taintSetName(event.target.value)}
          id="outlined-basic"
          label="Input String"
          variant="outlined"
        />
        <Button variant="contained" onClick={clickHandler}>
          Sanitize
        </Button>
        <Button variant="contained" onClick={evaluator}>
          Evaluate
        </Button>
        <Button variant="contained" onClick={concatenator}>
          Concatenate
        </Button>
      </Box>
    </div>
  );
}

export default App;
