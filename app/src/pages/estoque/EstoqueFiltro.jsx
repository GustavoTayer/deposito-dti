import { Button, Card, CardActions, CardContent, CardHeader, Grid, InputLabel, TextField } from "@material-ui/core";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { buscarEstoques } from "../../store/actions/estoque.action";

export default function EstoqueFiltro() {
  // *** Hooks ***
  const dispatch = useDispatch()
  const history = useHistory();

  // *** States ***
  const [nome, setNome] = useState()
  const [valorDe, setValorDe] = useState()
  const [valorAte, setValorAte] = useState()
  const [quantidadeDe, setQuantidadeDe] = useState();
  const [quantidadeAte, setQuantidadeAte] = useState();

  // *** Handle changes ***
  const handleChangeNome = useCallback((event) => setNome(event.target.value), [])
  const handleChangeValorDe = useCallback((event) => setValorDe(event.target.value), [])
  const handleChangeValorAte = useCallback((event) => setValorAte(event.target.value), [])
  const handleChangeQuantidadeDe = useCallback((event) => setQuantidadeDe(event.target.value), [])
  const handleChangeQuantidadeAte = useCallback((event) => setQuantidadeAte(event.target.value), [])

  // *** Buscar ***
  const buscar = useCallback(() => dispatch(buscarEstoques({
    nome, valorDe, valorAte, quantidadeAte, quantidadeDe
  })), [dispatch, nome, quantidadeAte, quantidadeDe, valorAte, valorDe])

  const novoEstoque = useCallback(() => history.push('/editar/novo'), [history])

  

  return (
    <Card>
      <CardHeader title="Listagem de depósito" />
      <CardContent >
        <form>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Nome:"
                value={nome}
                onChange={handleChangeNome}
                fullWidth />
            </Grid>
          </Grid>
          <Grid container spacing={4} style={{ marginTop: '8px' }}>
            <Grid item xs={12} md={3}>
              <InputLabel>Quantidade:</InputLabel>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="De:"
                    type='number'
                    value={quantidadeDe}
                    onChange={handleChangeQuantidadeDe}
                    fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Até:"
                    type='number'
                    value={quantidadeAte}
                    onChange={handleChangeQuantidadeAte}
                    fullWidth />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
            <InputLabel>Valor Unitário:</InputLabel>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="De:"
                    type='number'
                    value={valorDe}
                    onChange={handleChangeValorDe}
                    fullWidth />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Até:"
                    type='number'
                    value={valorAte}
                    onChange={handleChangeValorAte}
                    fullWidth />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <CardActions>
        <Button variant='contained' color='primary' onClick={buscar}>Buscar</Button>
        <Button variant='contained'  onClick={novoEstoque}>Novo Estoque</Button>
      </CardActions>
    </Card>
  )
}