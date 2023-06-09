import { useNavigate, useParams } from "react-router-dom";
import Patient from "../../models/patient";
import { useEffect, useState } from "react";
import { getTherapistPatient } from "../../services/api-service";
import * as d3 from "d3";

export const PatientPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient>();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (token) {
            if (localStorage.getItem('userType') !== 'therapist') {
                if (localStorage.getItem('userType') === 'patient') {
                    navigate('/patient');
                } else {
                    navigate('/login');
                }
            }
        } else {
            navigate('/login');
        }
        const patient_id = parseInt(id!);
        getTherapistPatient(token!, patient_id).then((response) => {
            setPatient(response);
        }).catch((error) => {
            console.log(error);
            alert(error);
        });
    }, [token, id]);

    useEffect(() => {
        if (patient) {
            createEmotionsPieChart();
        }
    }, [patient]);

    const createEmotionsPieChart = () => {
        const emotionsCount = new Map<string, number>();
        patient?.emotions.forEach((emotion) => {
            if (emotionsCount.has(emotion.emotion)) {
                emotionsCount.set(emotion.emotion, emotionsCount.get(emotion.emotion)! + 1);
            } else {
                emotionsCount.set(emotion.emotion, 1);
            }
        });

        const pieData = Array.from(emotionsCount, ([emotion, count]) => (
            {emotion, count}
        ));

        const width: number = 300;
        const height: number = 300;
        const radius: number = Math.min(width, height) / 2;

        const svg = d3
            .select("#emotions-pie-chart")
            .selectAll("svg")
            .remove()
            .exit()
            .data([null])
            .enter()
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            ;

        const g = svg
            .append("g")
            .attr("transform", `translate(${width / 2}, ${height / 2})`);

        const pie = d3.pie<{emotion: string; count: number}>().value((d: any) => d.count);
        const arc = d3.arc<d3.PieArcDatum<{emotion: string; count: number}>>().innerRadius(0).outerRadius(radius-10);
        const slices = g.selectAll("path").data(pie(pieData));

        slices
            .enter()
            .append("path")
            .attr("d", arc as any)
            .attr("fill", (d) => d3.schemeCategory10[d.index])
            .attr("stroke", "#fff")
            .style("stroke-width", "2px");

        const labels = g
            .selectAll("text")
            .data(pie(pieData));

        labels
            .enter()
            .append("text")
            .attr("transform", (d) => `translate(${arc.centroid(d)})`)
            .attr("dy", "0.35em")
            .style("text-anchor", "middle")
            .style("font-size", 12)
            .style("fill", "white")
            .text((d) => d.data.emotion);

        svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .style("font-size", 12)
        .text("Emotions and their frequency");
    };

    return (
        <div>
            <h1>{patient?.first_name} {patient?.last_name}'s dashboard</h1>
            <div>
                <p>Personal details: </p>
                <p>First name: {patient?.first_name}</p>
                <p>Last name: {patient?.last_name}</p>
                <p>Email: {patient?.email}</p>
                <p>Date of birth: {patient?.date_of_birth.toLocaleDateString()}</p>
                <p>Gender: {patient?.gender}</p>
                <p>Country: {patient?.country}</p>
                <p>City: {patient?.city}</p>
            </div>
            <p>Statistics: </p>
            <div id="emotions-pie-chart">
            </div>
        </div>
    );
}