import { ErrorMessage, Field, LessForm, useField, useForm } from "less-form";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(13).required(),
  password: yup.string().min(6).required(),
  friends: yup.array().min(3).required(),
  isMan: yup.bool().equals([true]).required(),
  radio: yup.bool().equals([true]).required(),
});

// import { soke } from "soke";

// const schema = soke.object({
//   email: soke.string().email().required(),
//   phone: soke.string().min(6).max(13).required(),
//   password: soke.string().min(6).required(),
//   friends: soke.array().min(3).required(),
//   isMan: soke.bool().required(),
//   radio: soke.bool().required(),
// });

function App() {
  const form = useForm({
    initialValues: {
      email: "not email",
      phone: "",
      password: "",
      friends: [],
      isMan: false,
      radio: false,
    },
    validateSchema: schema,
  });

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>Less form(use Field)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <LessForm value={form}>
          <div>
            <Field name="email">{(field) => <input {...field} />}</Field>
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field name="phone">{(field) => <input {...field} />}</Field>
            <ErrorMessage name="phone" />
          </div>
          <div>
            <Field name="password">{(field) => <input {...field} />}</Field>
            <ErrorMessage name="password" />
          </div>
        </LessForm>
      </div>
      <div style={{ marginTop: 20 }}>Less form(use Custom Component)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        {/* <LessForm value={form}>
          <Email />
          <Phone />
          <Password />
          <Friends />
          <Checkbox />
          <Radio />
        </LessForm> */}
      </div>
    </div>
  );
}

function Email() {
  const field = useField("email");
  return (
    <div>
      <input placeholder="please input email" {...field} />
      <div>{field.error}</div>
    </div>
  );
}

function Phone() {
  const field = useField("phone");
  return (
    <div>
      <input placeholder="please input phone" {...field} />
      <div>{field.error}</div>
    </div>
  );
}

function Password() {
  const field = useField("password");
  return (
    <div>
      <input placeholder="please input password" type="password" {...field} />
      <div>{field.error}</div>
    </div>
  );
}

function Friends() {
  const field = useField("friends");

  return (
    <div>
      <select multiple {...field}>
        <option onSelect={console.log} value="aaaaaa">
          aaa
        </option>
        <option value="apple">apple</option>
        <option value="banana">banana</option>
        <option value="dog">dog</option>
        <option value="cat">cat</option>
        <option value="fish">fish</option>
      </select>
      {JSON.stringify(field.value)}
      <div>{field.error}</div>
    </div>
  );
}

function Checkbox() {
  const field = useField("isMan");

  return (
    <div>
      <input type="checkbox" {...field}></input>
      <div>{field.error}</div>
    </div>
  );
}

function Radio() {
  const field = useField("radio");

  return (
    <div>
      <input type="radio" {...field}></input>
      <div>{field.error}</div>
    </div>
  );
}

export default App;
