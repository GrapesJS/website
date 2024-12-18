type Input = string | number | boolean | null | undefined;
type Inputs = Input | Array<Input>;

// Export the makeCls function as cx
export const cx = makeCls;

// Main function to process class names
export default function makeCls(...inputs: Inputs[]): string {
  // Flatten the inputs array if the first element is an array
  const flattenedInputs = Array.isArray(inputs[0]) ? inputs[0] : [...inputs];

  // Filter out any falsy values (e.g., null, undefined, false, 0, "")
  const filteredInputs = flattenedInputs.filter(Boolean);

  // Join the processed class names into a single string separated by spaces
  return filteredInputs.join(" ");
}
