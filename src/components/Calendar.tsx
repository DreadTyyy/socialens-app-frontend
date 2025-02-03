import React, { useRef, useState } from "react";
import { Text, Button, Spinner, Input, HStack } from "@chakra-ui/react";
import { 
    DialogRoot, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger,
    DialogBody,
    DialogFooter,
} from "./ui/dialog";
import { Field } from "./ui/field";
import FormLabel from "./FormLabel";
import { formattedShortDate, formattedShortFullDate } from "../utils/formattedDate";

const Calendar = ({firstDate, lastDate, getData}: 
    {
      firstDate: string; 
      lastDate: string; 
      getData: (startDate?: string | undefined, endDate?: string | undefined) => Promise<void>
    }) => {
  
  const [startDate, setStartDate] = useState<string>(firstDate);
  const [endDate, setEndDate] = useState<string>(lastDate);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
  const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  
  const ref = useRef<HTMLInputElement>(null);
  
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startDate !== "" || endDate !== "") {
        if (new Date(e.target.value) > new Date(endDate)) {
            setErrorSubmit(true);
            setErrorSubmitMessage("Tanggal awal tidak boleh lebih dari tanggal akhir");
            setLoading(false);
            return;
        }
    }
    setErrorSubmit(false);
    setStartDate(e.target.value);
}
  
  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (startDate !== "" || endDate !== "") {
        if (new Date(startDate) > new Date(e.target.value)) {
            setErrorSubmit(true);
            setErrorSubmitMessage("Tanggal akhir tidak boleh kurang dari tanggal awal");
            setLoading(false);
            return;
        }
    }
    setErrorSubmit(false);
    setEndDate(e.target.value);
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    
    if (startDate === "" || endDate === "") {
      setErrorSubmit(true);
      setErrorSubmitMessage("Masukan tanggal tidak boleh kosong");
      setLoading(false);
      return;
    }
    
    // if (new Date(firstDate) > new Date(startDate)) setStartDate(firstDate);
    // if (new Date(lastDate) < new Date(startDate)) setStartDate(lastDate);

    getData(startDate, endDate);
    setLoading(false);
    setOpen(false);
  }

  return (
    <DialogRoot lazyMount initialFocusEl={() => ref.current} open={open} placement="center">
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Text
          px="6px"
          py="2px"
          maxW="280px"
          fontSize="14px"
          borderRadius="full"
          color="dark.700"
          cursor="pointer"
          _hover={{ 
            bgColor: "dark.100"
          }}
        >
          {formattedShortDate(firstDate)} - {formattedShortFullDate(lastDate)}
        </Text>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tanggal Review</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {errorSubmit && <FormLabel variant="error">{errorSubmitMessage}</FormLabel>}
          <HStack gap="10px" w="full">
            <Field label="Tanggal mulai">
              <Input 
                id="start-date" 
                type="date" 
                onChange={handleStartDateChange}
                value={startDate}/>
            </Field>
            <Field label="Tanggal akhir">
              <Input 
                id="end-date"
                type="date" 
                onChange={handleEndDateChange}
                value={endDate}
                />
            </Field>
          </HStack>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>Batal</Button>
          <Button bgColor="primary.950" size="sm" onClick={handleSubmit}>
            {loading && <Spinner />}  
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default Calendar