import { useRef } from "preact/hooks";
import { FlexCol } from "../components/Flex";
export function LoginForm(props: {
  login: (change: { uid: string; pwd: string }) => void;
}) {
  const pwdRef = useRef<HTMLInputElement>(null);
  const usrRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="flex flex-col justify-center items-center"
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
          className="m-0.5 font-medium text-gray-600 text-center select-none"
        >
          UID
        </label>
        <input
          type="text"
          id="name"
          value="1"
          className="py-[3px] px-[7px] border border-gray-300 w-40 lg:w-60 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          ref={usrRef}
        />
      </FlexCol>
      <FlexCol className="m-1">
        <label
          for="password"
          className="m-0.5 font-medium text-gray-600 text-center select-none"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          value="1"
          className="py-[3px] px-[7px] border border-gray-300 w-40 lg:w-60 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
          ref={pwdRef}
        />
      </FlexCol>
      <FlexCol>
        <button className="py-[3px] px-[7px] w-40 lg:w-60 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          Submit
        </button>
      </FlexCol>
    </form>
  );
}
