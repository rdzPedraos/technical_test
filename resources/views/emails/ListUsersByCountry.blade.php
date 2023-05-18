<!DOCTYPE html>
<html>

<head>
    <title>Conteo de usuarios por pais</title>
</head>

<body>
    <div>
        <h1>Conteo de usuarios por pais!</h1>
        <table style="text-align: center">
            <thead>
                <tr>
                    <th>Bandera</th>
                    <th>Pais</th>
                    <th>Total usuarios</th>
                </tr>
            </thead>

            <tbody>
                @foreach ($countUsersByCountry as $item)
                    <tr>
                        <td>{{ $item['flag'] }}</td>
                        <td>{{ $item['country'] }}</td>
                        <td align="rigth">{{ $item['count'] }}</td>
                    </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>
