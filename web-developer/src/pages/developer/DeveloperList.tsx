import React, { useEffect, useState, useCallback } from "react";
import { DeveloperService } from "../../service";
import { DeveloperDTO } from "../../type";
import {
  CircularProgress,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  IconButton,
  Fab,
} from "@material-ui/core";
import EditOutlined from "@material-ui/icons/EditOutlined";
import AddIcon from "@material-ui/icons/Add";

import "./developerlist.css";


const style: any = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

const DeveloperList = () => {
  const [loading, setLoading] = useState<boolean>();
  const [developers, setDevelopers] = useState<DeveloperDTO[]>();
  const [totalElements, setTotalElements] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [field, setField] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const doPagedSearch = useCallback((searchQuery?: string) => {
    setLoading(true);
    const pagination = { page, pageSize };
    DeveloperService.findAllPaged(searchQuery ?? "", pagination)
      .then((response) => {
        setDevelopers(response.data.content);
        setTotalElements(response.data.totalElements);
      })
      .catch((error) => alert(`Erro ao buscar os desenvolvedores, ${error}`))
      .finally(() => setLoading(false));
  }, [page, pageSize]);

  useEffect(() => {
    doPagedSearch();
  }, [doPagedSearch]);

  const doSearch = () => {
    if (field && search) {
      const searchQuery = field.concat("=").concat(search);
      doPagedSearch(searchQuery);
    }
  };

  const onChangeSelect = (event: React.ChangeEvent<any>) => {
    setField(event.target.value);
  };

  const handleChangePage = (_: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="table-panel">
      {loading ? (
        <div className="loading">
          <CircularProgress />
        </div>
      ) : (
        <div className="container">
          <FormControl>
            <div className="form-container">
              <Select
                displayEmpty
                className="select-fields"
                value={field}
                onChange={(event) => onChangeSelect(event)}
              >
                <MenuItem value="">
                  <em>Selecione o campo do filtro</em>
                </MenuItem>
                <MenuItem value="name">Nome</MenuItem>
                <MenuItem value="age">Idade</MenuItem>
                <MenuItem value="gender">Sexo</MenuItem>
                <MenuItem value="hobby">Hobby</MenuItem>
                <MenuItem value="bithdate">Data de nascimento</MenuItem>
              </Select>
              <TextField
                name="search"
                label="Pesquisa"
                onChange={(event) => setSearch(event.target.value)}
              />
              <Button variant="outlined" color="primary" onClick={doSearch}>
                Filtrar
              </Button>
            </div>
          </FormControl>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Nome</TableCell>
                  <TableCell align="left">Sexo</TableCell>
                  <TableCell align="left">Idade</TableCell>
                  <TableCell align="left">Hobby</TableCell>
                  <TableCell align="left">Data de nascimento</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {developers ? (
                  developers.map((item) => (
                    <TableRow key={`${item.name}-${item.birthdate}`}>
                      <TableCell align="left">{item.name}</TableCell>
                      <TableCell align="left">{item.gender}</TableCell>
                      <TableCell align="left">{item.age}</TableCell>
                      <TableCell align="left">{item.hobby}</TableCell>
                      <TableCell align="left">{item.birthdate}</TableCell>
                      <TableCell align="right">
                        <IconButton>
                          <EditOutlined />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableCell align="left">Nenhum item encontrado</TableCell>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            className="pagination"
            rowsPerPageOptions={[10, 20]}
            component="div"
            count={totalElements}
            labelRowsPerPage={"Quantidade"}
            rowsPerPage={pageSize}
            labelDisplayedRows={({ from, to, count }) =>
              `${from} - ${to} de ${count} `
            }
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

          <Fab style={style} color="primary" className="floating-action-button">
            <AddIcon />
          </Fab>
        </div>
      )}
    </div>
  );
};

export default DeveloperList;
