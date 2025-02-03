import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner, Text, Flex, Button } from "@chakra-ui/react";
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogActionTrigger } from "../components/ui/dialog";

import { GrPowerReset } from "react-icons/gr";
import { deleteRestaurant } from "../utils/api";
import FormLabel from "./FormLabel";

const ResetButton = ({userId}: {userId: number}) => {
    const ref = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [errorField, setErrorField] = useState<string>("");
                   
    const handleDeleteRestaurant = async () => {
      setLoading(true);
      const {error, message} = await deleteRestaurant({userId});
      setLoading(false);
      if (error) {
        setErrorField(message);
      }
      navigate('/dashboard');
    }
    return (
      <DialogRoot initialFocusEl={() => ref.current} placement="center">
        <DialogTrigger asChild>
          <Flex 
            alignItems="center" 
            gap="8px" 
            px="12px" 
            py="8px" 
            borderRadius="12px" 
            bgColor="danger"
            color="white"
            cursor="pointer"
            transition="all 0.2s ease-in"
            _hover={{ 
              bgColor: "red.700"
            }}
            >
              <GrPowerReset size={18}/>
              <Text>Reset</Text>
            </Flex>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            {errorField && <FormLabel variant="error">{errorField}</FormLabel>}
            <DialogTitle> Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.</DialogTitle>
          </DialogHeader>
          <DialogFooter>
              <DialogActionTrigger asChild>
                <Button variant="outline" _hover={{ bgColor: "dark.100" }} size="sm">Batal</Button>
              </DialogActionTrigger>
              <Button 
                bgColor="danger" 
                _hover={{ bgColor: "red.700" }} 
                size="sm" 
                onClick={handleDeleteRestaurant}
              >
                {loading ? <Spinner /> : <>Hapus</>}
              </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    )
  }

export default ResetButton;