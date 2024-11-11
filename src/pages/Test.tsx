import Select from "react-select";

export default function Test() {
  return (
    <Select
      inputId="test"
      options={[
        { value: "chocolate", label: "Chocolate" },
        { value: "strawberry", label: "Strawberry" },
        { value: "vanilla", label: "Vanilla" },
      ]}
    />
  );
}
