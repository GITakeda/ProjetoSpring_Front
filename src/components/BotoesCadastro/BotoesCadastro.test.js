import { fireEvent, render } from '@testing-library/react'
import BotoesCadastro from './BotoesCadastro'
import '@testing-library/jest-dom'

describe('Button Component', () => {
  test('Renderização', () => {
    const { getByText, debug } = render(<BotoesCadastro/>);
    
    const element1 = getByText('Cadastrar');
    const element2 = getByText('Limpar');
    const element3 = getByText('Apagar');

    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    expect(element3).toBeInTheDocument();
  })
})