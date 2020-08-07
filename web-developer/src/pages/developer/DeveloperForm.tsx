import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { DeveloperService } from "../../service";
import { DeveloperDTO } from "../../type";
import { Formik, Form } from "formik";
import {
  InputLabel,
  TextField,
  CircularProgress,
  Button,
  Select,
  FormControl,
} from "@material-ui/core";

import "./developerform.css";

const initialValues = {
  _id: undefined,
  name: "",
  age: 0,
  gender: "masculino",
  hobby: "",
  birthdate: new Date().toString(),
};

const DeveloperForm: React.FC<{}> = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const [loading, setLoading] = useState<boolean>(false);
  const [developer, setDeveloper] = useState<DeveloperDTO>();

  useEffect(() => {
    if (id !== "new") {
      setLoading(true);
      DeveloperService.findById(id)
        .then((response) => setDeveloper(response.data))
        .catch((error) =>
          alert(`Erro ao buscaro o desenvolvedor com id: ${id}, ${error}`)
        )
        .finally(() => setLoading(false));
    }
  }, [id]);

  const submit = (values: DeveloperDTO) => {
    console.log(values)
    setLoading(true);
    DeveloperService.saveOrUpdate(values)
      .then(() => {
        alert(`Desenvolvedor cadastrado com sucesso.`);
        history.replace("/developer");
      })
      .catch((error) =>
        alert(`Não foi possível cadastrar o desenvolvedor, ${error}`)
      )
      .finally(() => setLoading(false));
  };

  const formatDate = (date: string) => {
    const dateToBeParsed = new Date(date);
    const year = dateToBeParsed.getFullYear();
    const month = `${dateToBeParsed.getMonth() + 1}`.padStart(2, '0');
    const day = dateToBeParsed.getDate();

    return `${year}-${month}-${day}`;
  }

  return (
    <div className="panel">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <Formik<DeveloperDTO>
          initialValues={developer ?? initialValues}
          onSubmit={submit}
        >
          {({ isSubmitting, handleChange, handleBlur, values }) => (
            <Form className="form-container">
              <FormControl
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TextField
                  style={{ width: "600px" }}
                  label="Nome"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <FormControl style={{ width: "600px" }}>
                  <InputLabel>Sexo</InputLabel>
                  <Select
                    native
                    name="gender"
                    label="Sexo"
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="feminino">Feminino</option>
                  </Select>
                </FormControl>

                <TextField
                  style={{ width: "600px" }}
                  type="number"
                  label="Idade"
                  name="age"
                  value={values.age}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  type="date"
                  style={{ width: "600px" }}
                  name="birthdate"
                  value={formatDate(values.birthdate)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  style={{ width: "600px" }}
                  label="Hobby"
                  name="hobby"
                  value={values.hobby}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="button-row">
                  <Button
                    color="primary"
                    variant="outlined"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    SALVAR
                  </Button>
                </div>
              </FormControl>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default DeveloperForm;
