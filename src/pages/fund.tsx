import React, { useState } from "react";
import styled from "@emotion/styled";
import { Typography, TextField, Button, Box } from "@mui/material";
import { getUser } from "../dpop";
import { useRouter } from "next/router";

const FundPage = () => {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  React.useEffect(() => {
    const user = getUser();
    if (!user) {
      router.push("/login");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Example Coinbase URL - replace with actual integration
      const coinbaseUrl = `https://pay.coinbase.com/buy?appId=f61d0358-28f7-4d80-95fd-0950a1b3091b&addresses={"0x3C6eF34939aaA850bA787cB775128746f86b8661":["base"]}&assets=["USDC"]&presetFiatAmount=${amount}&currency=USD`;
      window.location.href = coinbaseUrl;
    } catch (err) {
      setError("Failed to generate payment link. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageWrapper>
      <ContentBox>
        <Typography variant="h4" gutterBottom>
          Fund Your Account
        </Typography>
        
        <Typography variant="body1" sx={{ mb: 4 }}>
          Purchase crypto instantly using your credit card or bank account through our secure Coinbase integration.
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Amount (USD)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            sx={{ mb: 3 }}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>$</Typography>
            }}
          />

          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            disabled={!amount || isLoading}
          >
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>
        </form>
      </ContentBox>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const ContentBox = styled(Box)`
  max-width: 600px;
  width: 100%;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

export default FundPage;
