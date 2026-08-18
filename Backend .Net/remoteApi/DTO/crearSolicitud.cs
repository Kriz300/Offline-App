namespace remoteApi.DTOs;

public class CrearSolicitudDto
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Payload { get; set; } = string.Empty;
    public string Status { get; set; } = string.Empty;
    public DateTime createdAt { get; set; }
}