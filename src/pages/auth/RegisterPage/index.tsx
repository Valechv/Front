import { useLocation, useNavigate, Link } from "react-router-dom";

import { useAuth } from "../../../store/auth";
import useForm, { FormError } from "../../../hooks/useForm";
import { isEmpty } from "../../../utils/isEmpty";
import Fade from "../../../components/shared/Fade";
import InputFloat from "../../../components/shared/InputFloat";
import Button from "../../../components/shared/Button";
import { toast } from "sonner";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { loginAction } = useAuth();

  const { values, ...form } = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },

    validate: (values) => {
      const errors: FormError<typeof values> = {};
      if (isEmpty(values.email)) errors.email = "Este campo es requerido.";
      if (isEmpty(values.firstName))
        errors.firstName = "Este campo es requerido.";
      if (isEmpty(values.lastName))
        errors.lastName = "Este campo es requerido.";
      if (isEmpty(values.password))
        errors.password = "Este campo es requerido.";
      return errors;
    },
  });

  const from = (location.state?.from?.pathname as string) ?? "/";

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://biqueroo-production.up.railway.app/api/auth/signup",
        {
          method: "POST",
          body: JSON.stringify({ ...values, admin: false }),
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();
      if (!data.token) throw new Error("Ocurrió un error");

      loginAction(null);

      window.localStorage.setItem("accessToken", data.token);

      navigate(from, { replace: true });
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else toast.error("An error occurred, please try again.");
    }
  };

  return (
    <Fade>
      <div className="fondo-animado relative grid h-screen place-items-center overflow-y-auto py-12 md:py-0">
        <div className="md:shadow-[-px_1px_1px_0px_rgb(0_0_0_/_50%)] w-11/12 max-w-[420px] md:w-[380px] md:px-8 pb-10 mt-10 md:mt-0">
          <div className="flex items-center justify-center">
            <img src="/logo-bikerito.png" alt="" className="w-[160px]" />
          </div>
          <div className="w-[100%] h-[100px] grid place-items-center mx-auto mb-5">
            <p className="tittle text-white text-2xl">Crea una cuenta</p>
          </div>

          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-1 mb-8"
          >
            <InputFloat label="Nombres" {...form.inputProps("firstName")} />
            <InputFloat label="Apellidos" {...form.inputProps("lastName")} />
            <InputFloat
              type="email"
              label="Correo"
              {...form.inputProps("email")}
            />
            <InputFloat
              type="password"
              label="Contraseña"
              {...form.inputProps("password")}
            />
            <Button
              type="submit"
              color="white"
              variant="outline"
              // isLoading={loading}
            >
              Registrarse
            </Button>
          </form>

          <div className="flex justify-center flex-col items-center">
            {/* <Link to="/auth/recuperar" className="text-white hover:underline">
              <p className="text-white">¿Olvidaste tu Contraseña?</p>
            </Link> */}
            <Link to="/auth/login" className="text-white hover:underline">
              <p className="text-white">¿Ya tienes una cuenta?</p>
            </Link>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default RegisterPage;
