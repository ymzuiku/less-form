import { Field, FormProvider, useForm } from "less-form";
import { CreateObserver, useObserver } from "react-ob";
import * as yup from "yup";

const ob = CreateObserver({ email: "emailllllll" });

const schema = yup.object({
  email: yup.string().email().required(),
  phone: yup.string().min(6).max(13).required(),
  password: yup.string().min(6).required(),
});

function App() {
  const a = useObserver(ob, (s) => []);
  const ctx = useForm({
    initialValues: {
      email: "not email",
      phone: "",
      password: "",
    },
  });

  return (
    <div className="App">
      <div>aaaa</div>
      <div>{a.email}</div>
      <FormProvider value={ctx}>
        <Field name="email" />
        <Field name="phone" />
        <Field name="password" />
      </FormProvider>
    </div>
  );
}

export default App;
