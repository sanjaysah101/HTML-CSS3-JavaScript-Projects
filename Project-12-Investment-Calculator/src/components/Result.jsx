import React, { Children } from "react";
import { calculateInvestmentResults, formatter } from "../util/investment";

function Result({ input }) {
  const resultsData = calculateInvestmentResults(input);

  const [{ valueEndOfYear, interest, annualInvestment }] = resultsData;

  const initialInvestment = valueEndOfYear - interest - annualInvestment;

  return (
    <div id="result" className="center">
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Investment Value</th>
            <th>Interest (Year)</th>
            <th>Total Interest</th>
            <th>Invested Capital</th>
          </tr>
        </thead>
        <tbody>
          {Children.toArray(
            resultsData.map((data) => {
              const { year, interest, valueEndOfYear, annualInvestment } = data;

              const totalInterest =
                valueEndOfYear - annualInvestment * year - initialInvestment;

              const totalAmountInvested = valueEndOfYear - totalInterest;

              return (
                <tr>
                  <td>{year}</td>
                  <td>{formatter.format(valueEndOfYear)}</td>
                  <td>{formatter.format(interest)}</td>
                  <td>{formatter.format(totalInterest)}</td>
                  <td>{formatter.format(totalAmountInvested)}</td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Result;
