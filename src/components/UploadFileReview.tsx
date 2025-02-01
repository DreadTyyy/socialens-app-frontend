import React, { useRef, useState } from "react";
import { Text, Button, Spinner } from "@chakra-ui/react";
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
import { FileUploadRoot, FileUploadList, FileUploadTrigger } from "./ui/file-upload";
import { Field } from "./ui/field";
import { HiUpload } from "react-icons/hi";
import { createReview } from "../utils/api";

const UploadFileReview = ({restaurant_id, children}: {
  restaurant_id: number;
  children: React.ReactNode
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
  const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    
    if (!restaurant_id) {
      setErrorSubmit(true);
      setErrorSubmitMessage("Restoran tidak ditemukan atau buat terlebih dahulu");
      return;
    }
    if (!file) {
      setErrorSubmit(true);
      setErrorSubmitMessage("File harus diunggah!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    const {error, message} = await createReview({restaurant_id, formData});
    setLoading(false);
    if (error) {
      setErrorSubmit(true);
      setErrorSubmitMessage(message);
      return;
    }
    alert(message);
    window.location.href = '/dashboard/analytics';
  }

  return (
    <DialogRoot initialFocusEl={() => ref.current} placement="center">
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import data review</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {errorSubmit &&
            <Text bgColor="danger" color="white" w="100%" px={2} py={2} borderRadius="4px">
              {errorSubmitMessage}
            </Text>
          }
          <Field my="16px" label="Data review" helperText="Pastikan tabel sesuai & format yang didukung: .xlsx, .csv" required>
            <FileUploadRoot accept={[".csv", ".xlsx"]} onChange={handleFileChange}>
              <FileUploadTrigger>
                <Button variant="outline" size="sm">
                  <HiUpload /> 
                  <Text>Unggah File</Text>
                </Button>
              </FileUploadTrigger>
              <FileUploadList />
            </FileUploadRoot>
          </Field>
        </DialogBody>
        <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline" size="sm">Batal</Button>
            </DialogActionTrigger>
            <Button bgColor="primary.950" size="sm" onClick={handleSubmit}>
              {loading && <Spinner />}
              Simpan
            </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  )
}

export default UploadFileReview;