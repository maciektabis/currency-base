import ResultBox from './ResultBox';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
  });

  const testCasesPLNUSD = [
    { amount: 100, expected: 'PLN 100.00 = $28.57' },
    { amount: 20, expected: 'PLN 20.00 = $5.71' },
    { amount: 200, expected: 'PLN 200.00 = $57.14' },
    { amount: 345, expected: 'PLN 345.00 = $98.57' },
  ];

  const testCasesUSDPLN = [
    { amount: 100, expected: '$100.00 = PLN 350.00' },
    { amount: 200, expected: '$200.00 = PLN 700.00' },
    { amount: 150, expected: '$150.00 = PLN 525.00' },
    { amount: 345, expected: '$345.00 = PLN 1,207.50' },
  ];

for(const testObj of testCasesPLNUSD) {

  it('should render proper info about conversion when PLN -> USD', () => {
    render(<ResultBox from="PLN" to="USD" amount={testObj.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(testObj.expected);
  });
  cleanup();
}
for(const testObjUSD of testCasesUSDPLN) {

  it('should render proper info about conversion when USD -> PLN', () => {
    render(<ResultBox from="USD" to="PLN" amount={testObjUSD.amount} />);
    const output = screen.getByTestId('output');
    expect(output).toHaveTextContent(testObjUSD.expected);
  });
  cleanup();
}
it('should render proper info about conversion PLN -> PLN', () => {
  render(<ResultBox from='PLN' to='PLN' amount={123} />);
  const output = screen.getByTestId('output');
  expect(output).toHaveTextContent('PLN 123.00 = PLN 123.00');
});

it('should render proper info when value is less than zero', () => {
  render(<ResultBox from='USD' to='PLN' amount={-1} />);
  const output = screen.getByTestId('output-wrong');
  expect(output).toHaveTextContent('Wrong value...');
});


});