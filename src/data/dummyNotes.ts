import { TNote } from "../pages/Notes";

const numberOfNotes = 10;

const dummyNotes: () => TNote[] = () => {
  const notes: TNote[] = [];
  //for aux dependent date
  const creationDate = (i: number) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  };
  for (let i = 0; i < numberOfNotes; i++) {
    notes.push({
      id: i,
      text: `${i}: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, fermentum nunc ac, ultricies nunc. Nulla facilisi. Nullam nec nunc nec nunc.`,
      createDate: creationDate(i),
      createdBy: "Admin",
      updated: [],
    });
  }
  return notes;
};

export default dummyNotes;
