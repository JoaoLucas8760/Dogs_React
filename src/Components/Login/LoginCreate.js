import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import userForm from "../../Hooks/useForm";
import Error from "../../Components/Helper/Error";
import { USER_POST } from "../../Api/api";
import { UserContext } from "../../UserContext";
import useFetch from "../../Hooks/useFetch";
import Head from "../Helper/Head";
export default function LoginCreate() {
  const username = userForm();
  const email = userForm("email");
  const password = userForm();

  const { userLogin } = React.useContext(UserContext);

  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);
    if (response.ok) userLogin(username.value, password.value);
    console.log(response);
  }
  return (
    <section className="animeLeft">
      <Head title="Criar conta" />

      <h1 className="title">Cadaste-se</h1>

      <form onSubmit={handleSubmit}>
        <Input label="Usuário" type="text" name="username" {...username} />
        <Input label="Email" type="text" name="username" {...email} />
        <Input label="Senha" type="text" name="username" {...password} />

        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
}
