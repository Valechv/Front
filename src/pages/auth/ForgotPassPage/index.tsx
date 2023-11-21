import { useNavigate } from "react-router-dom";
import useForm, { FormError } from "../../../hooks/useForm";
import { isEmpty } from "../../../utils/isEmpty";
import Fade from "../../../components/shared/Fade";
import InputFloat from "../../../components/shared/InputFloat";
import Button from "../../../components/shared/Button";

export const RecuperarPage = () => {
  const router = useNavigate();

  const { values, ...form } = useForm({
    initialValues: {
      email: "",
    },
    validate: (values) => {
      const errors: FormError<typeof values> = {};
      if (isEmpty(values.email)) errors.email = "Este campo es requerido.";
      return errors;
    },
  });

  const handleSubmit = async () => {
    // try {
    //   await resetMutation({ variables: { email: values.email } })
    //   toast({
    //     type: 'info',
    //     title: 'Enviado',
    //     desc: 'Si posees un correo registrado recibirás tu nueva contraseña.'
    //   })
    // } catch (error) {
    //   toast({
    //     type: 'info',
    //     title: 'Error desconocido',
    //     desc: 'No se pudo restaurar la contraseña, vuelva a intentarlo.'
    //   })
    // } finally {
    //   router('/auth/login')
    // }
  };

  return (
    <Fade>
      <div className="relative grid h-screen place-items-center bg-primary dark:bg-secondary">
        <div className="shadow-[-5px_5px_10px_0px_rgb(0_0_0_/_50%)] rounded-[10px] w-[380px] pt-3 px-12 pb-10">
          <form
            onSubmit={form.onSubmit(handleSubmit)}
            className="flex flex-col gap-1 mb-8"
          >
            <InputFloat
              type="email"
              label="Correo"
              {...form.inputProps("email")}
              required
            />

            <Button
              type="submit"
              color="white"
              variant="outline"
              // isLoading={loading}
            >
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </Fade>
  );
};

export default RecuperarPage;
