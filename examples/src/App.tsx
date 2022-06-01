import {
  ErrorMessage,
  Field,
  FormProvider,
  useField,
  useForm,
} from "less-form";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(13).required(),
  password: yup.string().min(6).required(),
  friends: yup.array().min(3).required(),
  isMan: yup.bool().required(),
});

function App() {
  const form = useForm({
    initialValues: {
      email: "not email",
      phone: "",
      password: "",
      friends: [],
      isMan: false,
    },
    validateSchema: schema,
  });

  return (
    <div className="App">
      <div style={{ marginTop: 20 }}>Less form(use Field)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <FormProvider value={form}>
          <div>
            <Field type="email" placeholder="please input email" name="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <Field type="phone" placeholder="please input phone" name="phone" />
            <ErrorMessage name="phone" />
          </div>
          <div>
            <Field
              type="password"
              placeholder="please input password"
              name="password"
            />
            <ErrorMessage name="password" />
          </div>
        </FormProvider>
      </div>
      <div style={{ marginTop: 20 }}>Less form(use Custom Component)</div>
      <div style={{ padding: 10, margin: 10, border: "1px solid #aaa" }}>
        <FormProvider value={form}>
          <Email />
          <Phone />
          <Password />
          <Friends />
          <Checkbox />
        </FormProvider>
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

export default App;
