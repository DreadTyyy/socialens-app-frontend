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
} from "./ui/dialog";
import { FileUploadRoot, FileUploadList, FileUploadTrigger } from "./ui/file-upload";
import { Field } from "./ui/field";
import { HiUpload } from "react-icons/hi";
import { createReview } from "../utils/api";
import FormLabel from "./FormLabel";

const UploadFileReview = ({restaurant_id, children}: {
  restaurant_id: number;
  children: React.ReactNode
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [errorSubmit, setErrorSubmit] = useState<boolean>(false);
  const [errorSubmitMessage, setErrorSubmitMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorSubmit(false);
    
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
    
    setLoading(true);
    const {error, message} = await createReview({restaurant_id, formData});
    setLoading(false);
    if (error) {
      setErrorSubmit(true);
      setErrorSubmitMessage(message);
      return;
    }
    alert(message);
    setOpen(false);
    window.location.href = "/dashboard/analytics";
  }

  return (
    <DialogRoot lazyMount open={open} initialFocusEl={() => ref.current} placement="center">
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import data review</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {errorSubmit && <FormLabel variant="error">{errorSubmitMessage}</FormLabel>}
          {loading && !errorSubmit && <FormLabel variant="normal">Sedang memproses data, ini mungkin memakan waktu lebih lama</FormLabel>}
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

export default UploadFileReview;