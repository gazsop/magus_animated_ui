import { useRef } from "preact/hooks";
import { FlexCol } from "../components/Flex";
export function LoginForm(props: {
  login: (change: { uid: string; pwd: string }) => void;
}) {
  const pwdRef = useRef<HTMLInputElement>(null);
  const usrRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex flex-col justify-center items-center w-60 lg:w-80 h-40 self-center fancy-container"
      id="login-form"
      onSubmit={(e) => {
        e.preventDefault(); // Prevent the default form submission
        if (!usrRef.current?.value || !pwdRef.current?.value) return;
        props.login({
          uid: usrRef.current?.value,
          pwd: pwdRef.current?.value,
        }); // Call the login function
      }}
    >
      <FlexCol className="m-1">
        <label
          for="name"
          className="m-0.5 font-bold text-center select-none text-white"
        >
          UID {window.innerHeight}
        </label>
        <input
          type="text"
          id="name"
          value="1"
          className="py-[3px] px-[7px] w-40 lg:w-60 rounded-md text-center"
          ref={usrRef}
        />
      </FlexCol>
      <FlexCol className="m-1">
        <label
          for="password"
          className="m-0.5 font-bold text-center select-none text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value="1"
          className="py-[3px] px-[7px] w-40 lg:w-60 rounded-md text-center"
          ref={pwdRef}
        />
      </FlexCol>
      <FlexCol>
        <button className="py-[3px] px-[7px] w-40 lg:w-60">Submit</button>
      </FlexCol>
    </form>
  );
}
