import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { Button, Input, List, ListIcon, ListItem } from "@chakra-ui/react";
import { CheckCircleIcon, TimeIcon, AddIcon } from "@chakra-ui/icons";

export default function Home() {
  const [selectedPlate, setSelectedPlate] = useState("");
  const [plates, setPlates] = useState({});
  const [platesOrder, setPlatesOrder] = useState([]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (!selectedPlate) return;

    const id = Math.floor(Math.random() * 100000 + 1);
    setPlates((prevPlates) => ({
      ...prevPlates,
      [id]: { id, type: selectedPlate, delivered: false },
    }));
    setPlatesOrder((prevPlatesOrder) => [id, ...prevPlatesOrder]);
    setSelectedPlate("");
  };

  return (
    <div>
      <Head>
        <title>Sushi List</title>
        <meta
          name="description"
          content="Un modo per segnarsi i piatti del sushi"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>SUSHI LIST</h1>
        <p className={styles.description}>Per ricordare cosa hai ordinato</p>
        <form
          className={styles.form}
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <Input
            placeholder="Il numero della portata"
            onChange={(evt) => setSelectedPlate(evt.target.value)}
            value={selectedPlate}
            autoComplete="off"
          />
          <Button
            colorScheme="teal"
            size="md"
            type="submit"
            aria-label="Aggiungi portata"
          >
            <AddIcon />
          </Button>
        </form>
        <List spacing={6}>
          {platesOrder.map((plateId) => {
            const { type, delivered } = plates[plateId];
            const handlePlateClick = () =>
              setPlates((prevPlates) => ({
                ...prevPlates,
                [plateId]: {
                  ...prevPlates[plateId],
                  delivered: !prevPlates[plateId].delivered,
                },
              }));

            return (
              <ListItem
                className={styles.listItem}
                key={plateId}
                onClick={handlePlateClick}
              >
                <ListIcon
                  as={delivered ? CheckCircleIcon : TimeIcon}
                  color={delivered ? "green.500" : "orange.500"}
                />
                <span style={{ textDecoration: delivered && "line-through" }}>
                  Portata {type}
                </span>
              </ListItem>
            );
          })}
        </List>
      </main>
    </div>
  );
}
