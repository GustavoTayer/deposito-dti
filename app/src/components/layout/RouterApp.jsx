import { Route, Switch } from "react-router";
import { EstoqueEditar } from "../../pages/estoque/estoqueEditar";
import { EstoqueListagem } from "../../pages/estoque/estoqueListagem";

const RouterApp = () => (
  <Switch>
    <Route path="/editar/:id">
      <EstoqueEditar />
    </Route>
    <Route path="/">
      <EstoqueListagem />
    </Route>
  </Switch>
)
export default RouterApp;