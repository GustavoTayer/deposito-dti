import { IconButton, LinearProgress, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@material-ui/core";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { buscarEstoques, deletarEstoque } from "../../store/actions/estoque.action";
import EstoqueFiltro from "./EstoqueFiltro";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    marginTop: '10px'
  }
}))


export function EstoqueListagem() {

  // *** hooks ***
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => dispatch(buscarEstoques({})), [dispatch])

  // *** redux ***
  const { list, map, loading } = useSelector(({ estoque }) => estoque)

  // *** Actions ***
  const onDelete = useCallback((id) => dispatch(deletarEstoque(id)), [dispatch])
  const onEdit = useCallback((id) => history.push(`/editar/${id}`), [history])

  return (
    <>
      <EstoqueFiltro />
      <TableContainer className={classes.tableContainer} component={Paper} >
        {loading && <LinearProgress />}
        <Table>
          <TableRow >
            <TableCell key="nome">Nome</TableCell>
            <TableCell key="quantidade">Quantidade</TableCell>
            <TableCell key="valor">Valor Unitário</TableCell>
            <TableCell key="actions">Ações</TableCell>
          </TableRow>
          <TableBody>
            {
              list.map(id => {
                const estoque = map[id];
                return (
                  <TableRow key={`linha_${id}`}>
                    <TableCell key="nome">{estoque.nome}</TableCell>
                    <TableCell key="quantidade">{estoque?.quantidade}</TableCell>
                    <TableCell key="valorUnidade">{estoque?.valorUnitario?.toLocaleString('pt-BR', {
                      style: 'currency',
                      currency: 'BRL'
                    })}</TableCell>
                    <TableCell key="action">
                      <IconButton onClick={() => onEdit(id)} color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => onDelete(id)} color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}