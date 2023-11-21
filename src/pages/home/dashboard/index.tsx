import { useEffect, useState } from "react";
import Button from "../../../components/shared/Button";
import { Note, ToggleProps } from "../../../interface";
import useToggle from "../../../hooks/useToggle";
import Modal from "../../../components/shared/Modal";
import InputFloat from "../../../components/shared/InputFloat";
import useForm, { FormError } from "../../../hooks/useForm";
import { toast } from "sonner";
import { isEmpty } from "../../../utils/isEmpty";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

const HomePage = () => {
  const [data, setData] = useState<Note[]>([
    // {
    //   id: 1,
    //   user: {
    //     id: null,
    //     firstName: "Aracely ayala",
    //     lastName: "ayal",
    //     email: "aya@exam2ple.com",
    //     password: "",
    //     role: "USER",
    //     enabled: true,
    //     username: "aya@exam2ple.com",
    //     authorities: [
    //       {
    //         authority: "USER",
    //       },
    //     ],
    //     accountNonExpired: true,
    //     accountNonLocked: true,
    //     credentialsNonExpired: true,
    //   },
    //   userIdTransient: null,
    //   category: "Comportamiento Humano",
    //   title: "El aprendizaje",
    //   description: "Apuntes sobre la clase el aprendizaje y del psicoanálisis ",
    //   file: "https://i.ibb.co/9n2R7DR/Whats-App-Image-2023-10-25-at-3-04-19-PM-2.jpg",
    //   notifications: [],
    // },
  ]);

  const toggle = useToggle();

  useEffect(() => {
    (async () => {
      const storedToken = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://biqueroo-production.up.railway.app/publication",
        {
          headers: { Authorization: "Bearer " + storedToken },
        }
      );
      const dataRes: Note[] = await res.json();
      if (dataRes) setData(dataRes);
    })();
  }, []);

  return (
    <div className="w-full p-6 md:p-12 gap-6">
      <div className="w-full justify-end flex max-w-7xl mx-auto mb-6">
        <Button type="button" onClick={() => toggle.onOpen()}>
          Crear
        </Button>
      </div>

      {toggle.isOpen ? <CreateModal {...toggle} /> : null}

      <div className="w-full flex flex-wrap gap-6 max-w-7xl mx-auto justify-center items-center">
        {data.map((i, index) => (
          <Card key={index} data={i} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;

const Card = ({ data }: { data: Note }) => {
  const [emg, setEmg] = useState<string>();
  const toggleImg = useToggle();

  return (
    <div className="w-full max-w-md bg-gray-100 rounded-lg p-6 h-max md:w-[410px]">
      <p className="font-semibold text-gray-600">{data.category}</p>
      <p className="font-semibold text-3xl">{data.title}</p>
      <p className="text-gray-700">{data.description}</p>

      <div className="w-full h-[160px] bg-white mt-3 rounded-lg overflow-hidden">
        <img
          onClick={() => toggleImg.onOpen()}
          src={data.file}
          className="w-full h-full object-contain cursor-pointer"
        />
      </div>

      <div className="flex mt-3 w-full justify-end">
        <div className="dropdown relative">
          {emg ? (
            <img src={emg} alt="Like emoji" />
          ) : (
            <button
              type="button"
              className="p-3 bg-white rounded-full text-primary"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                fill="currentColor"
              >
                <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2H464c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48H294.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V320 272 247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192H96c17.7 0 32 14.3 32 32V448c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
              </svg>
            </button>
          )}

          <div className="dropdown-menu absolute hidden -left-[160px] -top-[68px] pb-2 text-gray-700 w-max">
            <figure className="flex w-full">
              <img
                onClick={() => setEmg("/like.gif?raw=1")}
                src="/like.gif?raw=1"
                alt="Like emoji"
              />
              <img
                onClick={() => setEmg("/love.gif?raw=1")}
                src="/love.gif?raw=1"
                alt="Love emoji"
              />
              <img
                onClick={() => setEmg("/haha.gif?raw=1")}
                src="/haha.gif?raw=1"
                alt="Haha emoji"
              />
              <img
                onClick={() => setEmg("/wow.gif?raw=1")}
                src="/wow.gif?raw=1"
                alt="Wow emoji"
              />
              <img
                onClick={() => setEmg("/sad.gif?raw=1")}
                src="/sad.gif?raw=1"
                alt="Sad emoji"
              />
              <img
                onClick={() => setEmg("/angry.gif?raw=1")}
                src="/angry.gif?raw=1"
                alt="Angry emoji"
              />
            </figure>
          </div>
        </div>
      </div>

      <Lightbox
        carousel={{ finite: true }}
        plugins={[Zoom]}
        open={toggleImg.isOpen}
        close={() => toggleImg.onClose()}
        slides={[{ src: data.file }]}
        zoom={{ maxZoomPixelRatio: 5 }}
        // on={{  }}
        styles={{
          navigationNext: { display: "none" },
          navigationPrev: { display: "none" },
        }}
      />
    </div>
  );
};

interface CreateModalProps extends ToggleProps {}

const CreateModal = ({ ...toggle }: CreateModalProps) => {
  const form = useForm({
    initialValues: {
      category: "",
      title: "",
      description: "",
      file: "",
    },
    validate: (values) => {
      const errors: FormError<typeof values> = {};
      if (isEmpty(values.category))
        errors.category = "Este campo es requerido.";
      if (isEmpty(values.description))
        errors.description = "Este campo es requerido.";
      if (isEmpty(values.title)) errors.title = "Este campo es requerido.";

      if (!isEmpty(values.file)) {
        try {
          new URL(values.file);
        } catch (error) {
          errors.file = "Debe ingresar un enlace";
        }
      }
      if (isEmpty(values.file)) errors.file = "Este campo es requerido.";
      return errors;
    },
  });

  const handleSubmit = async () => {
    try {
      const storedToken = window.localStorage.getItem("accessToken");
      const response = await fetch(
        "https://biqueroo-production.up.railway.app/publication",
        {
          method: "POST",
          body: JSON.stringify({ ...form.values }),
          headers: {
            Authorization: "Bearer " + storedToken,
            "Content-Type": "application/json",
          },
        }
      );

      const dataRes = await response.json();

      if (!dataRes) throw new Error("Error");
      toast.success("El apunte se a creado correctamente");
      toggle.onClose();
    } catch (error) {
      toast.error("Ocurrió un error, vuelva a intentarlo.");
    }
  };

  return (
    <Modal {...toggle}>
      <div className="bg-white p-6 w-screen rounded-lg max-w-[640px] sm:min-h-max mx-auto min-h-screen">
        <header className="flex justify-between items-center mb-6">
          <p className="text-xl font-semibold">Crear</p>
          <Button isIcon type="button" onClick={toggle.onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 384 512"
              fill="currentColor"
            >
              <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
            </svg>
          </Button>
        </header>

        <section>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <InputFloat label="Curso" {...form.inputProps("category")} />
            <InputFloat label="Titulo" {...form.inputProps("title")} />
            <InputFloat
              label="Descripción"
              {...form.inputProps("description")}
            />
            <InputFloat label="Imagen (URL)" {...form.inputProps("file")} />

            <div className="flex justify-between">
              <Button
                type="button"
                onClick={toggle.onClose}
                variant="ghost"
                color="secondary"
              >
                Cancelar
              </Button>
              <Button type="submit">Crear</Button>
            </div>
          </form>
        </section>
      </div>
    </Modal>
  );
};
