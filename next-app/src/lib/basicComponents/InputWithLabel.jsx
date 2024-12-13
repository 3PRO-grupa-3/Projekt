import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function InputWithLabel({
  inputType,
  labelText,
  datafield,
  inputValue,
  dataSetter,
}) {
  return (
    <>
      <Label htmlFor={datafield}>{labelText}</Label>
      {inputType === "textarea" && (
        <Textarea
          id={datafield}
          value={inputValue[datafield]}
          onChange={(e) =>
            dataSetter((prevInputValue) => {
              return { ...prevInputValue, [datafield]: e.target.value };
            })
          }
        />
      )}
      {inputType === "text" && (
        <Input
          type={"text"}
          id={datafield}
          value={inputValue[datafield]}
          onChange={(e) =>
            dataSetter((prevInputValue) => {
              return { ...prevInputValue, [datafield]: e.target.value };
            })
          }
        />
      )}
      {inputType === "number" && (
        <Input
          type={"number"}
          id={datafield}
          value={inputValue[datafield]}
          onChange={(e) =>
            dataSetter((prevInputValue) => {
              return { ...prevInputValue, [datafield]: e.target.value };
            })
          }
        />
      )}
      {inputType === "date" && (
        <Input
          type={"date"}
          id={datafield}
          value={inputValue[datafield]}
          onChange={(e) =>
            dataSetter((prevInputValue) => {
              return { ...prevInputValue, [datafield]: e.target.value };
            })
          }
        />
      )}
    </>
  );
}
