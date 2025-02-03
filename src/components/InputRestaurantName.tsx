import React, { useState, useRef } from "react";
import { Button, Input, Spinner } from "@chakra-ui/react";
import { 
    DialogRoot, 
    DialogContent, 
    DialogHeader, 
    DialogTitle,
    DialogTrigger,
    DialogBody,
    DialogFooter,
    DialogActionTrigger,
} from "./ui/dialog";
import { Field } from "./ui/field";
import { createRestaurant } from "../utils/api";
import FormLabel from "./FormLabel";
import { useNavigate } from "react-router-dom";

const InputRestaurantName = ({userId, children}: {userId: number; children: React.ReactNode}) => {
    const [restaurantName, setRestaurantName] = useState<string>('');
    const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
    const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
  
    const handleRestaurantNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setRestaurantName(e.target.value);
    }
    const handleSubmit = async() => {
      setErrorSubmit(false);
      if (!restaurantName) {
        setErrorSubmit(true);
        setErrorSubmitMessage('Nama restoran tidak boleh kosong');
        return;
      }

      setLoading(true);
      const {error, message} = await createRestaurant({userId, title: restaurantName});
      setLoading(false);
  
      if (error) {
        setErrorSubmit(true);
        setErrorSubmitMessage(message);
        return;
      }
      navigate('/dashboard/analytics');
    }
  
    return (
      <DialogRoot initialFocusEl={() => ref.current} placement="center">
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Buat restoran</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {errorSubmit && <FormLabel variant="error">{errorSubmitMessage}</FormLabel>}
            <Field label="Nama restoran" required>
              <Input 
                type="text" 
                placeholder="Restoran A" 
                value={restaurantName} 
                onChange={handleRestaurantNameChange}
              />
            </Field>
          </DialogBody>
          <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" size="sm">Batal</Button>
              </DialogActionTrigger>
              <Button bgColor="primary.950" size="sm" onClick={handleSubmit}>
                {loading ? <Spinner /> : <>Simpan</>}
              </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  }

export default InputRestaurantName