package models

// Usuario representa una cuenta del sistema.
type Usuario struct {
	ID      int    `json:"id"`
	Usuario string `json:"usuario"`
	// Password nunca se serializa en JSON.
	Password string `json:"-"`
	Nombre   string `json:"nombre"`
	Rol      string `json:"rol"`
}

type LoginRequest struct {
	Usuario  string `json:"usuario"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string  `json:"token"`
	User  Usuario `json:"user"`
}

// Solicitud de trámite (RF-02) con su estatus en el expediente.
type Solicitud struct {
	ID      string `json:"id"`
	Fecha   string `json:"fecha"`
	Empresa string `json:"empresa"`
	RIF     string `json:"rif"`
	Estatus string `json:"estatus"`
}

type NuevaSolicitudRequest struct {
	Empresa     string `json:"empresa"`
	RIF         string `json:"rif"`
	Direccion   string `json:"direccion"`
	Parroquia   string `json:"parroquia"`
	Actividad   string `json:"actividad"`
	Superficie  float64 `json:"superficie"`
	Riesgo      string `json:"riesgo"`
}

// Certificado cubre tanto el historial interno como la consulta pública
// de constancias (folio FBBV-XXXX-XX).
type Certificado struct {
	Folio      string `json:"folio"`
	Empresa    string `json:"empresa"`
	RIF        string `json:"rif"`
	Tipo       string `json:"tipo"`
	Riesgo     string `json:"riesgo"`
	Superficie string `json:"superficie"`
	Emitido    string `json:"emitido"`
	Vence      string `json:"vence"`
	Estado     string `json:"estado"` // Vigente | Vencida | Revocado
	Resolucion string `json:"resolucion"`
}
