import React, { useEffect, useState, useRef } from 'react';
import { auth } from '../utils/firebase';
import { getFirestore, collection, addDoc, updateDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { query, where } from 'firebase/firestore';
import { Button, Typography, FormControl, InputLabel, TextField, Select, MenuItem, Container, InputAdornment, Stack, Grid } from '@mui/material';
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Divider from '@mui/material/Divider';

import UserDataUtility from '../utils/UserDataUtility';

const Comparison = () => {

    const dataUtilityRef = useRef(null);
    // Load Data using Utility
    const [loadedData, setLoadedData] = useState(null);

    const [leftData, setLeftData] = useState(null);
    const [rightData, setRightData] = useState(null);

    const [leftSelection, setLeftSelection] = useState('');
    const [rightSelection, setRightSelection] = useState('');

    const handleLeftSelectionChange = (event) => {
        setLeftSelection(event.target.value);
        const selectedOption = event.target.value;
        if (loadedData) {
            const { salary, parentsAddress, workplaceLocation, ...BTOData } = loadedData;
            switch (selectedOption) {
                case 'BTO 1':
                    setLeftData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO1 });
                    break;
                case 'BTO 2':
                    setLeftData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO2 });
                    break;
                case 'BTO 3':
                    setLeftData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO3 });
                    break;
                default:
                    break;
            }
        }
    };
        
    const handleRightSelectionChange = (event) => {
        setRightSelection(event.target.value);
        const selectedOption = event.target.value;
        if (loadedData) {
            const { salary, parentsAddress, workplaceLocation, ...BTOData } = loadedData;
            switch (selectedOption) {
                case 'BTO 1':
                    setRightData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO1 });
                    break;
                case 'BTO 2':
                    setRightData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO2 });
                    break;
                case 'BTO 3':
                    setRightData({ salary, parentsAddress, workplaceLocation, ...loadedData.BTO3 });
                    break;
                default:
                    break;
            }
        }
    };


    // To load the data into the useState above
    const handleLoadedData = (data) => {
        console.log("Loaded data:", data);
        data.BTO1 = { address: 'Teban Gardens Road', latitude: 1.32225, longitude: 103.74421 }
        data.BTO2 = { address: 'Bedok Reservoir Road', latitude: 1.3444358, longitude: 103.9404595 }
        data.BTO3 = { address: 'Marsiling Lane', latitude: 1.44455, longitude: 103.77608 }
        console.log("Setting data:", data);
        setLoadedData(data);
    };

    useEffect(() => {
        console.log("Auto fetch when load")
        dataUtilityRef.current.loadUserData();
    }, []);

    const fieldLabels = {
        address: 'Address',
        latitude: 'Latitude',
        longitude: 'Longitude'
    };

    return (
        <Container sx={{ mb: 2, mt: 2 }}>
            <UserDataUtility ref={dataUtilityRef} loadedData={handleLoadedData} />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Panel data={leftData} fieldLabels={fieldLabels} selection={leftSelection} onChange={handleLeftSelectionChange} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Panel data={rightData} fieldLabels={fieldLabels} selection={rightSelection} onChange={handleRightSelectionChange} />
                </Grid>
            </Grid>
        </Container>
    );
}

export default Comparison;

const Panel = ({ data, fieldLabels, selection, onChange }) => {
    return (
        <Container sx={{ border: 1, borderColor: 'silver', borderRadius: 1, boxShadow: 4, p: 2 }} style={{ background: '#e8e3e3' }}>
            <FormControl fullWidth>
                <InputLabel style={{ background: 'white' }}>Choose a BTO</InputLabel>
                <Select
                    label="Choose a BTO"
                    onChange={onChange}
                    value={selection}
                    sx={{ mb: 2 }}
                    style={{ background: 'white' }}
                >
                    <MenuItem value="BTO 1">BTO 1</MenuItem>
                    <MenuItem value="BTO 2">BTO 2</MenuItem>
                    <MenuItem value="BTO 3">BTO 3</MenuItem>
                </Select>
            </FormControl>
            {data ? (
                <Stack spacing={2}>
                    <Divider orientation="horizontal" flexItem style={{ background: 'gray' }} />
                    <Typography variant="h7">Salary: ${data.salary}</Typography>
                    <Divider orientation="horizontal" flexItem style={{ background: 'gray' }} />
                    <Typography variant="h7">{selection} Details:</Typography>
                    <Stack divider={<Divider orientation="horizontal" flexItem style={{ background: 'lightgray' }} />} spacing={1}>
                        {['address', 'latitude', 'longitude'].map((key) => (
                            <React.Fragment key={key}>
                                {data && data[key] && (
                                    <Stack spacing={0}>
                                        <Typography variant="body2">{fieldLabels[key]}:</Typography>
                                        <Typography>{data[key]}</Typography>
                                    </Stack>
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>
                    <Divider orientation="horizontal" flexItem style={{ background: 'gray' }} />
                    <Typography variant="h7">Parents' Address:</Typography>
                    <Stack divider={<Divider orientation="horizontal" flexItem style={{ background: 'lightgray' }} />} spacing={1}>
                        {['address', 'latitude', 'longitude'].map((key) => (
                            <React.Fragment key={key}>
                                {data && data.parentsAddress && (
                                    <Stack spacing={0}>
                                        <Typography variant="body2">{fieldLabels[key]}:</Typography>
                                        <Typography>{data.parentsAddress[key]}</Typography>
                                    </Stack>
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>
                    <Divider orientation="horizontal" flexItem style={{ background: 'gray' }} />
                    <Typography variant="h7">Workplace Address:</Typography>
                    <Stack divider={<Divider orientation="horizontal" flexItem style={{ background: 'lightgray' }} />} spacing={1}>
                        {['address', 'latitude', 'longitude'].map((key) => (
                            <React.Fragment key={key}>
                                {data && data.workplaceLocation && (
                                    <Stack spacing={0}>
                                        <Typography variant="body2">{fieldLabels[key]}:</Typography>
                                        <Typography>{data.workplaceLocation[key]}</Typography>
                                    </Stack>
                                )}
                            </React.Fragment>
                        ))}
                    </Stack>
                </Stack>
            ) : (
                <Typography variant='h7'>Choose a BTO to Compare</Typography>
            )}
        </Container>
    );
};
