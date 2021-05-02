import { Button, Card, CardActions, CardContent, CardHeader, Grid, TextField } from "@material-ui/core";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router"
import { toast } from "react-toastify";
import * as yup from 'yup';
import { atualizarEstoque, buscarEstoque, criarEstoque } from "../../store/actions/estoque.action";

export function EstoqueEditar() {
  // ** Hooks ***
  const { id } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    if (id && id !== 'novo') {
      dispatch(buscarEstoque(id))
    }
  }, [dispatch, id])



  // *** States ***
  const [nome, setNome] = useState('')
  const [quantidade, setQuantidade] = useState(0)
  const [valorUnitario, setValorUnitario] = useState(0)

  // *** Handle Changes ***
  const handleChangeNome = useCallback((e) => setNome(e.target.value), [])
  const handleChangeQuantidade = useCallback((e) => setQuantidade(e.target.value), [])
  const handleChangeValorUnitario = useCallback((e) => setValorUnitario(e.target.value), [])

  const schema = yup.object().shape({
    nome: yup.string().required('Campo Nome é obrigatório'),
    quantidade: yup.number().min(0).required('Campo Quantidade é obrigatório'),
    valorUnitario: yup.number().min(0).required('Campo valor unitário é obrigatório'),
  })


  const e = useSelector(({ estoque }) => estoque.map[id])

  // *** actions ***
  const salvar = useCallback(() => {
    const quant = quantidade || e?.quantidade
    const valor = valorUnitario || e?.valorUnitario 
    const estoque = { 
      nome: nome || e?.nome, 
      quantidade: quant && parseFloat(quant), 
      valorUnitario: quant && parseFloat(valor)
    }
    console.log(estoque)
    schema.validate(estoque).then((res) => {
      if (id !== 'novo') {
        dispatch(atualizarEstoque(id,estoque))
      } else {
        dispatch(criarEstoque(estoque))
      }
      toast.success(`Estoque ${id !== 'novo' ? 'atualizado' : 'criado'} com sucesso!`)
      history.push("/")
    }).catch(err => toast.error(err.message))
  }, [dispatch, e?.nome, e?.quantidade, e?.valorUnitario, history, id, nome, quantidade, schema, valorUnitario])

  return (
    <Card>
      <CardHeader title={`${id ? 'Editar' : 'Criar'} `} />
      <CardContent>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <TextField
              label="Nome:"
              value={nome || e?.nome}
              onChange={handleChangeNome}
              fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Quantidade:"
              type='number'
              value={quantidade || e?.quantidade}
              onChange={handleChangeQuantidade}
              fullWidth />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Valor:"
              type='number'
              value={valorUnitario || e?.valorUnitario}
              onChange={handleChangeValorUnitario}
              fullWidth />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button onClick={salvar} variant="contained" color="primary">Salvar</Button>
      </CardActions>
    </Card>

  );
}